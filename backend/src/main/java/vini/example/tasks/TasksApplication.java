package vini.example.tasks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import vini.example.tasks.Model.Task;
import vini.example.tasks.Repository.TaskRepository;

@SpringBootApplication
public class TasksApplication {

	public static void main(String[] args) {
		SpringApplication.run(TasksApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(TaskRepository taskrepository){
		return args -> {
			taskrepository.deleteAll();

			Task t = new Task();
			t.setName("Task 1");
			t.setDesc("Fazer o programa funcionar");

			taskrepository.save(t);
		};
	}
}
