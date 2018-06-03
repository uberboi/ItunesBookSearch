package project;

import java.io.*;
import java.net.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
@WebServlet("/SearchServlet")
public class searchServlet extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Acquire search parameters
		String param = request.getParameter("parameter");
		String[] arr = param.split(" ");
		StringBuffer sb = new StringBuffer();
		for (int i=0; i<arr.length; i++) {
			sb.append(arr[i] + "+");
		}

		//Remove extra '+' at end
		sb.deleteCharAt(sb.length() - 1);
		System.out.println(sb);
		
		//Perform get request
		try {
			URL url = new URL("https://itunes.apple.com/search?term="+sb.toString()+"&entity=audiobook&limit=1");
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			BufferedReader in = new BufferedReader(
	                new InputStreamReader(con.getInputStream()));
	        String inputLine;
	        //Create String buffer for JSON from GET request
	        StringBuffer sb1 = new StringBuffer();
	
	        while ((inputLine = in.readLine()) != null) {
	            sb1.append(inputLine);
	        }
	        in.close();
	        //Write JSON to GET request response
	        response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(sb1.toString());
	        System.out.println(sb1.toString());
		} catch (IOException e) {
	        e.printStackTrace();
	    }
		
	}
}
