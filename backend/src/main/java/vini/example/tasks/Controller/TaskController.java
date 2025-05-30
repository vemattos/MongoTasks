package vini.example.tasks.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.NotNull;
import vini.example.tasks.Model.Task;
import vini.example.tasks.Repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {

    private final TaskRepository taskRepository;
    
    TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @GetMapping
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<Task>> getAllTasks(){
        List<Task> allTasks = taskRepository.findAll();
        if (!allTasks.isEmpty()) {
            return ResponseEntity.ok(allTasks);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Task> getTaskById(@PathVariable @NotNull String id){
        Optional<Task> idTask = taskRepository.findById(id);
        if (idTask.isPresent()) {
            return ResponseEntity.ok(idTask.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        Task newTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }
    @PutMapping("/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Task> updateTask(@PathVariable @NotNull String id, @RequestBody Task task){
        Optional<Task> savedTask = taskRepository.findById(id);
        if (savedTask.isPresent()) {
            task.setId(id);
            Task updatedTask = taskRepository.save(task);
            return ResponseEntity.ok().body(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Task> deleteTask(@PathVariable @NotNull String id){
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
