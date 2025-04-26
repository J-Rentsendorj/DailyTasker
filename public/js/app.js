const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Fetch and render tasks
async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    list.innerHTML = tasks
        .map(task => `<li>${new Date(task.timestamp).toLocaleString()}: ${task.title}</li>`)
        .join('');
}

// Handle new task submission
form.addEventListener('submit', async e => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    input.value = '';
    loadTasks();
});

// Fetch and render tasks
async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    list.innerHTML = tasks.map(task => `
        <li>
            ${new Date(task.timestamp).toLocaleString()}: ${task.title}
            <button class="remove-btn" data-timestamp="${task.timestamp}">✕</button>
        </li>
    `).join('');

    // attach delete handlers
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const ts = btn.dataset.timestamp;
            await fetch(`/api/tasks/${ts}`, { method: 'DELETE' });
            loadTasks();
        });
    });
}

loadTasks();
