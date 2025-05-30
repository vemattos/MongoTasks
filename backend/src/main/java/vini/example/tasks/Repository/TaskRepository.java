package vini.example.tasks.Repository;

import org.springframework.stereotype.Repository;

import vini.example.tasks.Model.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
}
