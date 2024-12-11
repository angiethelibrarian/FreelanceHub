import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define UserAttributes interface
interface UserAttributes {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registrationDate?: Date;
}

// Define ProjectAttributes interface
interface ProjectAttributes {
  id: number;
  title: string;
  description?: string;
  budget: number;
  posterId: number; 
  status: 'Open' | 'In Progress' | 'Closed';
  createdDate?: Date;
  updatedDate?: Date;
}

// Define ProjectAcceptanceAttributes interface
interface ProjectAcceptanceAttributes {
  id?: number;
  projectId: number;
  projectName: string;
  acceptorId?: number; 
  acceptedDate?: Date;
  accepted: boolean;
  projectStatus: 'Pending' | 'Completed' | 'Suspended';
}

// Define UserCreationAttributes interface
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'registrationDate'> {}

// User class definition
export class User 
extends Model<UserAttributes, UserCreationAttributes> 
implements UserAttributes 
{
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly registrationDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  // Method to verify password
  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // Method to get full name
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Project class definition
export class Project 
  extends Model<ProjectAttributes> 
  implements ProjectAttributes 
{
  public id!: number;
  public title!: string;
  public description?: string;
  public budget!: number;
  public posterId!: number; // Corrected from postedId
  public status!: 'Open' | 'In Progress' | 'Closed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// ProjectAcceptance class definition
export class ProjectAcceptance
  extends Model<ProjectAcceptanceAttributes> 
  implements ProjectAcceptanceAttributes 
{
  public id!: number;
  public projectName!: string;
  public projectId!: number;
  public acceptorId!: number; 
  public readonly acceptedAt!: Date;
  public accepted!: boolean;
  public projectStatus!: 'Pending' | 'Completed' | 'Suspended'; 
}

export function initModels(sequelize: Sequelize) {
  // Initialize models
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registrationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      posterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Closed'),
        defaultValue: 'Open',
      },
    },
    {
      sequelize,
      tableName: 'projects',
    }
  );

  ProjectAcceptance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Project,
          key: 'id',
        },
      },
      acceptorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      projectStatus: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Suspended'),
        defaultValue: 'Pending',
      },
    },
    {
      sequelize,
      tableName: 'project_acceptances',
    }
  );

  // Define Associations
  User.hasMany(Project, { 
    foreignKey: 'posterId', 
    as: 'postedProjects' 
  });
  Project.belongsTo(User, { 
    foreignKey: 'posterId', 
    as: 'poster' 
  });

  User.hasMany(ProjectAcceptance, { 
    foreignKey: 'acceptorId', 
    as: 'projectAcceptances' 
  });
  ProjectAcceptance.belongsTo(User, { 
    foreignKey: 'acceptorId', 
    as: 'acceptor' 
  });

  Project.hasMany(ProjectAcceptance, { 
    foreignKey: 'projectId', 
    as: 'acceptances' 
  });
  ProjectAcceptance.belongsTo(Project, { 
    foreignKey: 'projectId', 
    as: 'project' 
  });

  return { User, Project, ProjectAcceptance };
}

// export function UserFactory(sequelize: Sequelize): typeof User {
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: 'users',
//       sequelize,
//       hooks: {
//         beforeCreate: async (user: User) => {
//           await user.setPassword(user.password);
//         },
//         beforeUpdate: async (user: User) => {
//           await user.setPassword(user.password);
//         },
//       }
//     }
//   );

//   return User;
// }
