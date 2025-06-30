CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COLLATE='utf8mb4_general_ci';

-- Usuario de prueba: admin@mail.com / admin123
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@mail.com', '$2a$10$k4B8cZ3e1FNR07nZZz5duumF0QKElK93rmOZpPRu1QU68Yr6Phz4K', 'admin');
