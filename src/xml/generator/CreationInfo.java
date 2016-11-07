package xml.generator;

public class CreationInfo {
	private String XMLCreatedBy;

    private String XMLCreationDate;

    private String SWVersionNo;

    private String SWCreatedBy;

    public String getXMLCreatedBy ()
    {
        return XMLCreatedBy;
    }

    public void setXMLCreatedBy (String XMLCreatedBy)
    {
        this.XMLCreatedBy = XMLCreatedBy;
    }

    public String getXMLCreationDate ()
    {
        return XMLCreationDate;
    }

    public void setXMLCreationDate (String XMLCreationDate)
    {
        this.XMLCreationDate = XMLCreationDate;
    }

    public String getSWVersionNo ()
    {
        return SWVersionNo;
    }

    public void setSWVersionNo (String SWVersionNo)
    {
        this.SWVersionNo = SWVersionNo;
    }

    public String getSWCreatedBy ()
    {
        return SWCreatedBy;
    }

    public void setSWCreatedBy (String SWCreatedBy)
    {
        this.SWCreatedBy = SWCreatedBy;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [XMLCreatedBy = "+XMLCreatedBy+", XMLCreationDate = "+XMLCreationDate+", SWVersionNo = "+SWVersionNo+", SWCreatedBy = "+SWCreatedBy+"]";
    }
}
