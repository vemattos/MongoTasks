package vini.example.tasks.Service;

import org.springframework.stereotype.Service;
import vini.example.tasks.Model.User;
import vini.example.tasks.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> finByName(String name) {
        return userRepository.findByName(name);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> login(String name, String password) {
        return userRepository.findByName(name)
                .filter(user -> user.getPassword().equals(password));
    }
}
