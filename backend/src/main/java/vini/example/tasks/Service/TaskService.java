package vini.example.tasks.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vini.example.tasks.Model.Task;
import vini.example.tasks.Repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task create(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> getById(String id) {
        return taskRepository.findById(id);
    }

    public List<Task> getByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getByType(String type) {
        return taskRepository.findByType(type);
    }

    public Optional<Task> update(String id, Task newTaskData) {
        return taskRepository.findById(id).map(existing -> {
            existing.setTitle(newTaskData.getTitle());
            existing.setDescription(newTaskData.getDescription());
            existing.setStatus(newTaskData.getStatus());
            existing.setType(newTaskData.getType());
            existing.setData(newTaskData.getData());
            existing.setUpdatedAt(LocalDateTime.now());
            return taskRepository.save(existing);
        });
    }

    public void delete(String id) {
        taskRepository.deleteById(id);
    }
}
