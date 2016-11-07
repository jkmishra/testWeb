package testWeb;

public class Book {
	private String author;
	private int pageCount;
	private String bookName;
	public Book(){
		
	}
	public Book(String author, int pageCount, String bookName){
		this.author=author;
		this.pageCount=pageCount;
		this.bookName=bookName;
	}
	
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	@Override
	public String toString() {
		return "Book [author=" + author + ", pageCount=" + pageCount + ", bookName=" + bookName + "]";
	}
	

}
