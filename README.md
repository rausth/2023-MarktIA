# 2023-MarktIA
Assignment for the 2023 edition of the "Web Development and the Semantic Web" course, by Delvani Antônio Mateus, Enzo Baioco Cussuol, Fernando Azevedo Peres and Rausth Borges Junqueira.

# Marktia 

Welcome to the Marktia project!

## Table of Contents
- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

Marktia is an online platform developed for connecting service providers with service seekers. The project aims to provide a user-friendly and efficient marketplace experience for both parties. It includes features such as service listings, search and filtering options, booking and scheduling capabilities, secure payment options, and review and rating systems.

## Technologies

The following technologies are used in the development of Marktia:

**Front-end Technologies:**
- TypeScript: A statically typed programming language that enhances JavaScript with additional features and improved scalability.
- NextJS: A React framework for server-side rendering (SSR) and building scalable modern web applications.
- NextAuth: A library for user authentication in Next.js applications.
- Tailwind CSS: A highly customizable utility-first CSS framework for building responsive interfaces quickly.

**Back-end Technologies:**
- Java: A popular and robust programming language widely used in enterprise application development.
- Spring Boot: A framework that simplifies the development of Java applications, providing an embedded Tomcat server and facilitating the creation of REST APIs.
- Spring Boot DevTools: Tools that enhance the development experience in a Spring Boot project.
- JPA: Java Persistence API, a specification for object-relational mapping in Java applications.
- Spring Security: A powerful security framework for Java applications.
- Lombok: A library that helps reduce boilerplate code in Java projects.
- MySQL Server: A popular open-source relational database management system.
- Tomcat: An Apache web server implementation of the Java Servlet and JavaServer Pages (JSP) technologies.

## Installation

To get started with Marktia, follow the steps below:

### With Docker:

We provide a docker-compose file, which is responsible for launching 3 containers: one for the database (MySQL), one for the backend (Spring Boot) and one for the frontend (NextJS). Just run:

```
docker-compose up
```

After everything is up (the process can take a little long), access the application at `http://localhost:3000`.

### Locally (Without Docker):

**Backend:**

1. Ensure you have Java JDK (at least version 8) and Apache Maven installed on your machine. Also, it is necessary to have a MySQL Server instance running.

2. Clone the repository by running the following command in your terminal or command prompt:
   ```
   git clone https://github.com/~/2023-MarktIA.git
   ```

3. Navigate to the backend directory:
   ```
   cd 2023-MarktIA/backend
   ```

4. Build the backend project using Maven:
   ```
   mvn spring-boot:run 
   ```
   This command will download the required dependencies, compile the source code, and package the application into a JAR file.


5. The backend server will start at `http://localhost:8080`.

**Frontend:**

1. Ensure you have Node.js and npm (Node Package Manager) installed on your machine.

2. Navigate to the frontend directory:
   ```
   cd 2023-MarktIA/frontend
   ```

3. Install the dependencies by running:
   ```
   npm install
   ```
   
5. Run the development environment:
   ```
   npm run dev
   ```

7. Start the frontend development server:
   ```
   npm start
   ```
   This will start the frontend server at `http://localhost:3000` and open the application in your default browser.


## Usage

Before running the services marketplace application, ensure that you have completed the installation steps mentioned above. Follow the instructions below to use Marktia Services Marketplace:

1. Start the back-end server by running the appropriate command.

2. Launch the front-end application using the specified command or script.

3. Access Marktia through your web browser at the provided URL.

4. Explore the marketplace features, search for services, book appointments, make payments, and provide feedback through reviews and ratings.

## Contributing

Contributions are welcome to improve Marktia Services Marketplace. If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them with descriptive messages.

4. Push your changes to your forked repository.

5. Submit a pull request, explaining your changes and the benefits they bring.

Please ensure that your contributions adhere to the project's code of conduct.

## License

The Marktia Services Marketplace project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code as per the terms of the license.
