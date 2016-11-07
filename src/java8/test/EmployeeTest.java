package java8.test;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class EmployeeTest {
	public static void main(String[] args) {
		// predicateTest();
		// consumerTest();
		streamTest();
	}

	private static void streamTest() {
		List<Employee> employees = getEmployees();
		List<Employee> temp;
		/* Get all employees staying at Chennai */
		temp = employees.stream().filter((emp) -> emp.getCity().equals("Chennai")).collect(Collectors.toList());
		System.out.println(temp + "\n");
		/* Get all employees whose salary > 50000 */
		temp = employees.stream().filter((emp) -> emp.getSalary() > 50000).collect(Collectors.toList());
		System.out.println(temp + "\n");
		/* Get all unique employees whose salary > 50000 */
		temp = employees.stream().filter((emp) -> emp.getSalary() > 50000).distinct().collect(Collectors.toList());
		System.out.println(temp + "\n");
		/* Get first 3 employees whose salary is > 50000 */
		temp = employees.stream().filter((emp) -> emp.getSalary() > 50000).limit(3).collect(Collectors.toList());
		System.out.println(temp + "\n");
		/* Sort employees by salary, whose salary is > 50000 */
		temp = employees.stream().filter((emp) -> emp.getSalary() > 50000).sorted(new Comparator<Employee>() {
			@Override
			public int compare(Employee emp1, Employee emp2) {
				if (emp1.getSalary() - emp2.getSalary() > 0)
					return 1;
				if (emp1.getSalary() - emp2.getSalary() < 0)
					return -1;
				else
					return 0;
			}

		}).collect(Collectors.toList());
		System.out.println(temp + "\n");
		
		 /*
		   * Sort employees by salary, whose salary is > 80000, and skip first 3
		   * employees.
		   */

		temp=employees.stream().filter((emp)-> emp.getSalary()>50000).sorted(new Comparator<Employee>() {

			@Override
			public int compare(Employee emp1, Employee emp2) {
				if (emp1.getSalary() - emp2.getSalary() > 0)
					return 1;
				if (emp1.getSalary() - emp2.getSalary() < 0)
					return -1;
				else
					return 0;
			}
		}).skip(4).collect(Collectors.toList());
		System.out.println(temp + "\n");
		
		/* Get all firstNames from all employees. */
		List<String> firstName = employees.stream().map(Employee:: getFirstName).collect(Collectors.toList());
		System.out.println(firstName+"\n");
		
		/* Get id, Employee from all employees. */
		
		
	}

	private static List<Employee> getEmployees() {
		Employee emp1 = new Employee(1, "Hari Krishna", "Gurram", 26, "Bangalore", 45000);
		Employee emp2 = new Employee(2, "Joel", "Chelli", 27, "Hyderabad", 40000);
		Employee emp3 = new Employee(3, "Shanmukh", "Kummary", 28, "Chennai", 50000);
		Employee emp4 = new Employee(4, "Harika", "Raghuram", 27, "Chennai", 70000);
		Employee emp5 = new Employee(5, "Sudheer", "Ganji", 27, "Bangalore", 55000);
		Employee emp6 = new Employee(6, "Rama Krishna", "Gurram", 27, "Bangalore", 100000);
		Employee emp7 = new Employee(7, "PTR", "PTR", 27, "Hyderabad", 150000);
		Employee emp8 = new Employee(8, "Siva krishna", "Ponnam", 28, "Hyderabad", 65000);
		Employee emp9 = new Employee(5, "Sudheer", "Ganji", 27, "Bangalore", 55000);

		List<Employee> employees = new ArrayList<>();

		employees.add(emp1);
		employees.add(emp2);
		employees.add(emp3);
		employees.add(emp4);
		employees.add(emp5);
		employees.add(emp6);
		employees.add(emp7);
		employees.add(emp8);
		employees.add(emp9);
		return employees;
	}

	public static void predicateTest() {
		List<Employee> employees = getEmployees();

		List<Employee> ageGreat27;
		List<Employee> firstNameStartsWithS;
		// (emp) -> emp.getAge() > 27;
		ageGreat27 = processEmployeesPredicate(employees, (xyz) -> xyz.getAge() > 27);
		firstNameStartsWithS = processEmployeesPredicate(employees, (emp) -> emp.getFirstName().startsWith("S"));

		System.out.println(ageGreat27);
		System.out.println(firstNameStartsWithS);
	}

	public static void consumerTest() {
		List<Employee> employees = getEmployees();

		System.out.println("Employee salaries before incrementing");
		System.out.println(employees);

		processEmployeesConsumer(employees, emp -> {
			double salary = emp.getSalary();
			salary = salary > 50000 ? salary + 0.5 * salary : salary + 0.7 * salary;
			emp.setSalary(salary);
		});

		System.out.println("\nEmployee salaries after incrementing");
		System.out.println(employees);
	}

	public static <T> List<T> processEmployeesPredicate(List<T> employees, Predicate<T> predicate) {
		List<T> tmpList = new ArrayList<>();
		for (T emp : employees) {
			if (predicate.test(emp)) {
				tmpList.add(emp);
			}
		}
		return tmpList;
	}

	public static <T> void processEmployeesConsumer(List<T> employees, Consumer<T> consumer) {
		for (T emp : employees) {
			consumer.accept(emp);
		}
	}

}
