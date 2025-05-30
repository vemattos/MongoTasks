package vini.example.tasks.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vini.example.tasks.Model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
    
}
