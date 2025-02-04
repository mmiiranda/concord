# **Concord Chat - Front-end (WIP)**

**Current Version**: `0.1.0-beta (open to public testing)`  
**PT-BR README**: [Clique aqui para ver em Português](./README-PTBR.md)  
**GitHub Projects (Front-end)**: [Front-end Project Board](https://github.com/mmiiranda/concord)  
**Back-end Repository**: [Concord Chat Back-end](http://github.com/marcusnogueiraa/concord-backend)  
**Project Deploy**: [Front-end Live Demo](http://164.68.101.141:8081/)  

---

## **Table of Contents**
1. [Collaborators](#collaborators)  
2. [Development Workflow & Best Practices](#development-workflow--best-practices)  
3. [Technologies & Dependencies](#technologies--dependencies)  
4. [Current Features](#current-features)  
5. [Work in Progress (WIP)](#work-in-progress-wip)  
6. [How to Run](#how-to-run)  
7. [Contact & Feedback](#contact--feedback)  
8. [License](#license)  

---

## **Collaborators**

Below are the main collaborators working on the project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/marcusnogueiraa">
        <img src="https://avatars.githubusercontent.com/marcusnogueiraa" width="100px;" alt="Marcus Nogueira"/>
        <br /><sub><b>Marcus Nogueira</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mmiiranda">
        <img src="https://avatars.githubusercontent.com/mmiiranda" width="100px;" alt="Mauricio Miranda"/>
        <br /><sub><b>Mauricio Miranda</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sheiely">
        <img src="https://avatars.githubusercontent.com/sheiely" width="100px;" alt="Sheiely Nascimento"/>
        <br /><sub><b>Sheiely Nascimento</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## **Development Workflow & Best Practices**

- **GitFlow** for structured branching.
- **Conventional Commits** for structured commit messages.

---

## **Technologies & Dependencies**

### **Core Technologies**
- **Vue 3**, **Vue Router**, **Vuex**  
- **Electron** for desktop apps  
- **Tailwind CSS** for styling  
- **PostCSS & Autoprefixer** for CSS processing  
- **Vee-Validate & Yup** for form validation  

---

## **Current Features**

### **Authentication & Security**
- JWT Authentication
- Protected Routes with Vue Router

### **WebSockets & Real-time Messaging**
- Real-time chat using WebSockets
- Live notifications and typing indicators

### **Friendship System & Notifications**
- Friend Requests (Send, Accept, Deny)
- Live status updates

### **Electron Integration**
- Runs as a desktop application

### **User Profile Management**
- Profile picture upload  
- Update username and email  

---

## **Work in Progress (WIP)**

- **Voice & Video Calls**  
- **File Sharing**  
- **Multi-language Support**  
- **Performance Optimizations**  

---
## **How to Run**

### **Local Development**
For local development, you can run the project in either **browser mode** or **Electron mode**.

#### **Run in Browser Mode (Vue CLI)**
```bash
npm run serve
```
This will start a local server at `http://localhost:8080/`.

#### **Run in Electron Mode**
To launch the app as a **desktop application**, run:
```bash
npm run electron:serve
```

---

### **Building for Production**
To generate an optimized **front-end build** for deployment:
```bash
npm run build
```
The compiled assets will be stored in the `/dist` folder.

#### **Building Electron Application**
To package the **Electron-based desktop application**:
```bash
npm run electron:build
```
This will create an executable for your platform.

---



## Contact & Feedback

- **Deployment Info**: Version `0.1.0-beta` is deployed on an Ubuntu 24.04 VPS for public tests.  
- **Feedback & Suggestions**: Please send your thoughts to [concord.chat@gmail.com](mailto:concord.chat@gmail.com).

---

## License

[MIT License](https://opensource.org/licenses/MIT) 

---

<img src="./src/assets/LoginImage.png" alt="Concord Art" width="500"/>


---  
*Thank you for checking out the Concord Chat Back-end! We look forward to your contributions and feedback.*
