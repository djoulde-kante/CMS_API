const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'node1 API',
      version: '1.0.0',
      description: "Documentation Swagger de l'API node1"
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}`, description: 'Dev server' }
    ]
  },
  apis: [
    './routes/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;