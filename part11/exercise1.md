I am going to take Java as the language for the CI/CD setup.
For linting I find in Google a tool called Checkstyle, so I will go with this for linting in Java.
I would add as well some step for code security with SonarQube.
For testing and building I would go with Maven because is the most recognised tool for building
Java projects.
Then for de CD aspect i would choose Docker to create an image of my app to ensure that works not
only on my machine and then deploy to the server.
I already know two alternatives to Jenkins or Github Actions. They are CircleCI and the gitlab
CI/CD but there are a lot of alternatives on internet.
I have worked with gitlab CI/CD before so for this Startup type of project I would go with a
cloud-based environment with gitlab becasuse it is easy to use and fast for the steps that
the project have to take.
