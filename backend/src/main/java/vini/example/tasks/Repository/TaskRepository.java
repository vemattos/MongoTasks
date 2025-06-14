package vini.example.tasks.Repository;

import org.springframework.stereotype.Repository;

import vini.example.tasks.Model.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByUserId(String userId);
}
