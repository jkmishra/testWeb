package xml.generator;

import java.util.List;

public class Ns2IncomeDtls {
	private List<Ns2IncomeDtl> ns2IncomeDtlList;

	@Override
	public String toString() {
		return "Ns2IncomeDtls [ns2IncomeDtlList=" + ns2IncomeDtlList + "]";
	}

	public List<Ns2IncomeDtl> getNs2IncomeDtlList() {
		return ns2IncomeDtlList;
	}

	public void setNs2IncomeDtlList(List<Ns2IncomeDtl> ns2IncomeDtlList) {
		this.ns2IncomeDtlList = ns2IncomeDtlList;
	}

}
