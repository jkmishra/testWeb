package xml.generator;

public class Ns2FormCreationInfo {
	private Form_Details Form_Details;

    private CreationInfo CreationInfo;

    public Form_Details getForm_Details ()
    {
        return Form_Details;
    }

    public void setForm_Details (Form_Details Form_Details)
    {
        this.Form_Details = Form_Details;
    }

    public CreationInfo getCreationInfo ()
    {
        return CreationInfo;
    }

    public void setCreationInfo (CreationInfo CreationInfo)
    {
        this.CreationInfo = CreationInfo;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [Form_Details = "+Form_Details+", CreationInfo = "+CreationInfo+"]";
    }
}
