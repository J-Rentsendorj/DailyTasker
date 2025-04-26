# TaskTide
A simple daily task tracker built with Node.js, Express.js, and a file-based JSON database. Add and remove tasks in real time without page reloads—responsive and clean UI included.
## Technologies Used
- **Backend:** Node.js, Express.js  
- **Database:** JSON file (`db.json`)  
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)  
## Features
- **Add Tasks** with timestamp  
- **Remove Tasks** by clicking a delete button  
- **Real-Time Updates** without page refresh  
- **Responsive Design** for mobile and desktop  
- **Accessible Markup** with proper labels and focus states  
## Live Demo


https://github.com/user-attachments/assets/899c8af5-1029-4d33-ad39-5d00d0510fc6


## Getting Started
### Prerequisites
- Node.js v14+  
- npm v6+  
### Installation
1. **Clone the repository**  
   ```bash
   git clone https://github.com/J-Rentsendorj/DailyTasker.git && cd DailyTasker
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Run the app**  
   ```bash
   npm start
   ```
4. **Open in browser** Visit `http://localhost:3000`
## Project Structure
```
tasktide/
├── server.js         # Express server & API routes
├── db.json           # File-based “database”
├── package.json      # Project metadata & scripts
└── public/
    ├── index.html    # Frontend markup
    ├── css/
    │   └── style.css # Stylesheet
    └── js/
        └── app.js    # Frontend logic (Fetch + DOM)
```
## API Documentation
### GET /api/tasks
Retrieve all tasks.  
**Response** `200 OK`
```json
[
  {
    "title": "Buy groceries",
    "timestamp": 1624849200000
  },
  {
    "title": "Schedule meeting",
    "timestamp": 1624852800000
  }
]
```
### POST /api/tasks
Add a new task.  
**Request**
```json
{ "title": "Buy groceries" }
```
**Response** `201 Created`
```json
{
  "title": "Buy groceries",
  "timestamp": 1624849200000
}
```
### DELETE /api/tasks/:timestamp
Remove a task by its timestamp.  
**Request** `DELETE /api/tasks/1624849200000`  
**Response** `200 OK`
```json
{ "success": true }
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.  
## License
This project is licensed under the MIT License.
