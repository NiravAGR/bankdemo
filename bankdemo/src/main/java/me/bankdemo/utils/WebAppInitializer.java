package me.bankdemo.utils;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		System.out.println("*** WebAppInitializer getRootConfigClasses ***");
		return new Class[] { AppConfig.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		System.out.println("*** WebAppInitializer getServletConfigClasses ***");
		return new Class[] { WebConfig.class };
	}

	@Override
	protected String[] getServletMappings() {
		System.out.println("*** WebAppInitializer getServletMappings ***");
		return new String[] { "/" };
	}

}
