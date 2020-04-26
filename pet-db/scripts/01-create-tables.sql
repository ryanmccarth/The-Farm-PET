CREATE TABLE companies (
    companyId int PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    companyUserId INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password CHAR(60),
    managerId INT,
    companyId INT,
    startDate DATE,
    FOREIGN KEY (managerId) REFERENCES users(userId),
    FOREIGN KEY (companyId) REFERENCES companies(companyId)
);

CREATE TABLE reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    writtenBy INT,
    writtenFor INT,
    reviewText TEXT,
    lastUpdated DATETIME,
    isDraft BOOLEAN,
    FOREIGN KEY (writtenBy) REFERENCES users(userId),
    FOREIGN KEY (writtenFor) REFERENCES users(userId)
);

CREATE TABLE requests (
    requestId INT AUTO_INCREMENT PRIMARY KEY,
    requestedBy INT,
    requestedFor INT,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requestedBy) REFERENCES users(userId),
    FOREIGN KEY (requestedFor) REFERENCES users(userId)
);
