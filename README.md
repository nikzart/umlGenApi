# PlantUML API Service

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Project Structure](#project-structure)
10. [Contributing](#contributing)
11. [License](#license)

## Description
The PlantUML API Service is a robust Node.js-based RESTful API that converts PlantUML code into UML diagrams. It seamlessly interfaces with the official PlantUML server to generate diagrams, stores the resulting PNG images locally, and utilizes SQLite to efficiently manage image metadata. Generated images are accessible via URLs and are automatically deleted after 12 hours to manage storage and maintain privacy.

## Features
- **Diagram Generation**: Convert PlantUML code to high-quality PNG images
- **Local Image Storage**: Securely store images in a local `images` directory
- **SQLite Database Integration**: Track and manage image metadata for efficient retrieval and management
- **Automatic Cleanup**: Implement a 12-hour retention policy for images and metadata
- **Open API**: No authentication required, ensuring easy access and integration
- **Swagger Documentation**: Comprehensive API documentation using Swagger UI

## Prerequisites
- Node.js (v12 or later)
- npm (v6 or later)
- Git (for version control and deployment)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/plantuml-api-service.git
   ```
2. Navigate to the project directory:
   ```
   cd plantuml-api-service
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create an `images` directory in the project root:
   ```
   mkdir images
   ```

## Configuration
Modify `config.js` to adjust settings such as port number, PlantUML server URL, and image retention period. Here's an example configuration:

```javascript
module.exports = {
  port: process.env.PORT || 3000,
  plantumlServer: 'http://www.plantuml.com/plantuml/png/',
  imagePath: './images',
  imageRetentionHours: 12
};
```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:3000/api/generate-uml`
3. Access the Swagger documentation at `http://localhost:3000/api-docs`

### API Endpoint
- **POST** `/api/generate-uml`
  - Request body:
    ```json
    {
      "code": "@startuml\nAlice -> Bob: Hello\nBob --> Alice: Hi there\n@enduml"
    }
    ```
  - Response:
    ```json
    {
      "imageUrl": "http://localhost:3000/images/12345678-1234-1234-1234-123456789012.png"
    }
    ```

## API Documentation
The API is documented using OpenAPI 3.0.0 specification. You can access the Swagger UI documentation at `http://localhost:3000/api-docs` when the server is running. Below is the complete OpenAPI schema for the service:

```yaml
openapi: 3.0.0
info:
  title: PlantUML API Service
  description: A service that generates UML diagrams from PlantUML code
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com
servers:
  - url: http://localhost:3000/api
    description: Local development server
paths:
  /generate-uml:
    post:
      summary: Generate UML Diagram
      description: Generates a UML diagram from the provided PlantUML code
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UMLRequest'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UMLResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    UMLRequest:
      type: object
      required:
        - code
      properties:
        code:
          type: string
          description: PlantUML code to generate the diagram
          example: "@startuml\nAlice -> Bob: Hello\nBob --> Alice: Hi there\n@enduml"
    UMLResponse:
      type: object
      properties:
        imageUrl:
          type: string
          description: URL of the generated UML diagram image
          example: "http://localhost:3000/images/12345678-1234-1234-1234-123456789012.png"
    Error:
      type: object
      properties:
        error:
          type: string
          description: Error message
          example: "Failed to generate UML diagram"
```

## Testing
You can test the API using tools like Postman or curl. Here's an example using curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"code":"@startuml\nAlice -> Bob: Hello\nBob --> Alice: Hi there\n@enduml"}' http://localhost:3000/api/generate-uml
```

For more complex diagrams, you can use a file to store the PlantUML code:

```bash
curl -X POST -H "Content-Type: application/json" -d @plantuml_code.json http://localhost:3000/api/generate-uml
```

Where `plantuml_code.json` contains:

```json
{
  "code": "@startuml\nactor Client\nparticipant \"First Class\" as A\nparticipant \"Second Class\" as B\nparticipant \"Last Class\" as C\nClient -> A: DoWork\nactivate A\nA -> B: Create Request\nactivate B\nB -> C: DoWork\nactivate C\nC --> B: WorkDone\ndeactivate C\nB --> A: Request Created\ndeactivate B\nA --> Client: Done\ndeactivate A\n@enduml"
}
```

## Project Structure
```
plantuml-api-service/
├── config.js
├── server.js
├── package.json
├── README.md
├── swagger.yaml
├── routes/
│   └── umlRoutes.js
├── controllers/
│   └── umlController.js
├── services/
│   ├── plantumlService.js
│   └── cleanupService.js
├── db/
│   └── database.js
└── images/
```

## Contributing
We welcome contributions to the PlantUML API Service! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the existing style and that you've added tests for your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
=======
# umlGenApi
The PlantUML API Service is a Node.js RESTful API that converts PlantUML code into UML diagrams. It interfaces with the official PlantUML server, stores resulting PNG images locally, and uses SQLite for image metadata management. Images are accessible via URLs and are deleted after 12 hours to manage storage and privacy.