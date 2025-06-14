package vini.example.tasks.Service;

import org.springframework.stereotype.Service;
import vini.example.tasks.Model.Task;
import vini.example.tasks.Repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> findById(String id) {
        return taskRepository.findById(id);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> update(String id, Task task) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    task.setId(id);
                    return taskRepository.save(task);
                });
    }

    public void delete(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findTasksByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }
}