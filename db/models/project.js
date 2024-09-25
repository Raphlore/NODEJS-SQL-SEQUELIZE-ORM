const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Title cannot be null',
      },
      notEmpty: {
        msg: 'Title cannot be empty',
      },
    },
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      isIn: {
        args: [[true, false]],
        msg: 'isFeatured value must be true or false',
      },
    },
  },
  productImage: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'productImage cannot be null',
      },
      notEmpty: {
        msg: 'productImage cannot be empty',
      },
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Price cannot be null',
      },
      isDecimal: {
        msg: 'Price value must be in decimal',
      },
    },
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Short description cannot be null',
      },
      notEmpty: {
        msg: 'Short description cannot be empty',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Description cannot be null',
      },
      notEmpty: {
        msg: 'Description cannot be empty',
      },
    },
  },
  productUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product URL cannot be null',
      },
      isUrl: {
        msg: 'Invalid product URL string',
      },
    },
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Category cannot be null',
      },
    },
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tags cannot be null',
      },
    },
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},
{
  paranoid: true,
  freezeTableName: true,
  modelName: 'project',
});
