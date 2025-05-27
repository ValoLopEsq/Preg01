<%@page import="net.sf.jasperreports.engine.JasperRunManager"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="java.io.File"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Reporte</h1>
        <%
            Connection cn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practicacriptoii", "root", "");
            File reporte = new File(application.getRealPath("/reportes/reportePersonas.jasper"));
            byte[] bytes = JasperRunManager.runReportToPdf(reporte.getPath(), null, cn);
            response.setContentType("application/pdf");
            response.setContentLength(bytes.length);
            ServletOutputStream outS = response.getOutputStream();
            outS.write(bytes, 0, bytes.length);
            outS.flush();
            outS.close();
        %>
    </body>
</html>
