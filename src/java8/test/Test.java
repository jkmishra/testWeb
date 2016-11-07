package java8.test;

import java.util.Objects;

public class Test {
	public static void main(String[] args) {
		Operations add = new Operations() {

			@Override
			public int operation(int a, int b) {

				return a + b;
			}
		};
		Operations sub = (a, b) -> (a - b);
		Operations mul=(int a, int b)->(a*b);
		Operations div=(a,b)->{return (a/b);};
		System.out.println(div.operation(8,2));
		Test test=new Test();
		test.hashCode();
	}

	@Override
	 public int hashCode() {
		System.out.println(Objects.hash(4,2));
	  return Objects.hash(null);
	 }
	
}
