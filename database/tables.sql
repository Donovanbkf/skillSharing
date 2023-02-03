USE skillsharing;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);



CREATE TABLE IF NOT EXISTS skills (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    skill ENUM('mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica') NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS requests (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    userId INTEGER(10) REFERENCES users(id),
    skillId INTEGER(10) REFERENCES skills(id)
);


CREATE TABLE IF NOT EXISTS responses (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    userId INTEGER(10) REFERENCES users(id),
    skillId INTEGER(10) REFERENCES skills(id)
);

CREATE TABLE IF NOT EXISTS collaboration (
    id INTEGER(10) PRIMARY KEY AUTO_INCREMENT, 
    requestId INTEGER(10) REFERENCES requests(id),
    responseId INTEGER(10) REFERENCES responses(id),
    skillId INTEGER(10) REFERENCES skills(id)
);

SHOW TABLES;