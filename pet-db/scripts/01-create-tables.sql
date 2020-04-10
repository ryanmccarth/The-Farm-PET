CREATE TABLE companies (
    companyId int PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE users (
    userId INT PRIMARY KEY,
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
    reviewId INT PRIMARY KEY,
    writtenBy INT,
    writtenFor INT,
    reviewText TEXT,
    lastUpdated DATETIME,
    isDraft BOOLEAN,
    FOREIGN KEY (writtenBy) REFERENCES users(userId),
    FOREIGN KEY (writtenFor) REFERENCES users(userId)
);

CREATE TABLE requests (
    requestId INT PRIMARY KEY,
    requestedBy INT,
    requestedFor INT,
    created DATETIME,
    FOREIGN KEY (requestedBy) REFERENCES users(userId),
    FOREIGN KEY (requestedFor) REFERENCES users(userId)
);
