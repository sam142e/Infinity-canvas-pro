// ===========================================
// INFINITY CANVAS PRO - STORAGE MANAGER
// ===========================================

class StorageManager {
    // Save project
    static saveProject(projectName, state) {
        const storageKey = `${CONSTANTS.STORAGE_KEY}_${projectName}`;
        try {
            localStorage.setItem(storageKey, JSON.stringify(state));
            return true;
        } catch (e) {
            console.error('Failed to save project:', e);
            return false;
        }
    }
    
    // Load project
    static loadProject(projectName) {
        const storageKey = `${CONSTANTS.STORAGE_KEY}_${projectName}`;
        try {
            const data = localStorage.getItem(storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load project:', e);
            return null;
        }
    }
    
    // Delete project
    static deleteProject(projectName) {
        const storageKey = `${CONSTANTS.STORAGE_KEY}_${projectName}`;
        try {
            localStorage.removeItem(storageKey);
            return true;
        } catch (e) {
            console.error('Failed to delete project:', e);
            return false;
        }
    }
    
    // List all projects
    static listProjects() {
        const projects = [];
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(CONSTANTS.STORAGE_KEY)) {
                    projects.push(key.replace(`${CONSTANTS.STORAGE_KEY}_`, ''));
                }
            }
        } catch (e) {
            console.error('Failed to list projects:', e);
        }
        return projects;
    }
    
    // Export project as JSON
    static exportProject(projectName, state) {
        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${projectName}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
    
    // Import project from JSON
    static importProject(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const state = JSON.parse(e.target.result);
                    resolve(state);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
}
