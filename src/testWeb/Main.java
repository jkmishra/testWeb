package testWeb;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
	public static void main(String[] args) throws FileNotFoundException {		
		List<Book> bookList = new ArrayList<>();
		getBookList().stream().forEach(p -> System.out.println(p.toString()));
		getBookList().stream().filter(p -> "james gosling".equals(p.getAuthor())).collect(Collectors.toList());
		System.out.println(
				getBookList().stream().filter(p -> 200 < p.getPageCount()).collect(Collectors.toList()).size());
		getBookList().stream().filter(p -> 200 < p.getPageCount()).collect(Collectors.toList()).stream()
				.forEach(p -> System.out.println(p.toString()));
		System.out.println("\\\nnnnnnnnnnnnnnn");
		getBookList().stream().filter(p -> p.getPageCount()>200).collect(Collectors.toCollection(ArrayList<Book>::new)).stream()
		.forEach(p -> System.out.println(p.toString()));
		
	}

	private static List<Book> getBookList() {
		Book book = new Book("james gosling", 200, "java in depth first edition");
		Book book1 = new Book("james gosling", 201, "java in depth second edition");
		Book book2 = new Book("james gosling", 202, "java in depth third edition");
		Book book3 = new Book("james gosling", 203, "java in depth fourth edition");
		List<Book> bookList = new ArrayList<>();
		bookList.add(book3);
		bookList.add(book2);
		bookList.add(book1);
		bookList.add(book);
		return bookList;
	}

}
