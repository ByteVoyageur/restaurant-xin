const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Xiaosong API',
      version: '1.0.0',
      description: 'This is the API for La Flambée Italian Restaurant',
    },
  },
  apis: ['./routes/*.js'], // 指向路由文件或者直接在这里写API文档的注释
}

const specs = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
