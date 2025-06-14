package vini.example.tasks.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import vini.example.tasks.Model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);
}
