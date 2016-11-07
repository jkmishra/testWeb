package xml.generator;

public class Form_Details {
	private String AssessmentYear;

    private String FormVer;

    private String FormName;

    private String SchemaVer;

    public String getAssessmentYear ()
    {
        return AssessmentYear;
    }

    public void setAssessmentYear (String AssessmentYear)
    {
        this.AssessmentYear = AssessmentYear;
    }

    public String getFormVer ()
    {
        return FormVer;
    }

    public void setFormVer (String FormVer)
    {
        this.FormVer = FormVer;
    }

    public String getFormName ()
    {
        return FormName;
    }

    public void setFormName (String FormName)
    {
        this.FormName = FormName;
    }

    public String getSchemaVer ()
    {
        return SchemaVer;
    }

    public void setSchemaVer (String SchemaVer)
    {
        this.SchemaVer = SchemaVer;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [AssessmentYear = "+AssessmentYear+", FormVer = "+FormVer+", FormName = "+FormName+", SchemaVer = "+SchemaVer+"]";
    }
}
