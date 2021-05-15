package com.osi.vehicle_access.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class DateRangeUtils {

	public HashMap<String, LocalDateTime> getTodayDates() {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime startDate = now.with(LocalTime.MIN);
		LocalDateTime endDate = now.with(LocalTime.MAX);
		HashMap<String, LocalDateTime> todayDates = new HashMap<String, LocalDateTime>();
		todayDates.put("todayStart", startDate);
		todayDates.put("todayEnd", endDate);
		return todayDates;
	}

	public HashMap<String, LocalDate> getThisWeekDates() {
		LocalDate today = LocalDate.now();

		// Go backward to get Monday
		LocalDate monday = today;
		while (monday.getDayOfWeek() != DayOfWeek.MONDAY) {
			monday = monday.minusDays(1);
		}
		// Go forward to get Sunday
		LocalDate sunday = today;
		while (sunday.getDayOfWeek() != DayOfWeek.SUNDAY) {
			sunday = sunday.plusDays(1);
		}
		HashMap<String, LocalDate> thisWeekDates = new HashMap<String, LocalDate>();
		thisWeekDates.put("thisWeekMonday", monday);
		thisWeekDates.put("thisWeekSunday", sunday);

		return thisWeekDates;
	}

	public HashMap<String, LocalDate> getThisMonthDates() {
		LocalDate monthBegin = LocalDate.now().withDayOfMonth(1);
		LocalDate monthEnd = LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1);

		HashMap<String, LocalDate> thisMonthDates = new HashMap<String, LocalDate>();
		thisMonthDates.put("thisMonthBegin", monthBegin);
		thisMonthDates.put("thisMonthEnd", monthEnd);

		return thisMonthDates;
	}

	public HashMap<String, LocalDate> getLastMonthDates(Integer minusMonthsFromCurrent) {
		LocalDate monthBegin = LocalDate.now().withDayOfMonth(1).minusMonths(minusMonthsFromCurrent);
		LocalDate monthEnd = monthBegin.plusMonths(1).withDayOfMonth(1).minusDays(1);

		HashMap<String, LocalDate> lastMonthDates = new HashMap<String, LocalDate>();
		lastMonthDates.put("lastMonthBegin", monthBegin);
		lastMonthDates.put("lastMonthEnd", monthEnd);

		return lastMonthDates;
	}

	public HashMap<String, LocalDate> getLastNDates(Integer minusDaysFromCurrent) {
		LocalDate dayBegin = LocalDate.now().minusDays(minusDaysFromCurrent);
		LocalDate dayEnd = LocalDate.now().minusDays(1);

		HashMap<String, LocalDate> lastNDates = new HashMap<String, LocalDate>();
		lastNDates.put("dayBegin", dayBegin);
		lastNDates.put("dayEnd", dayEnd);

		return lastNDates;
	}

	public List<LocalDate> getDatesBetween(LocalDate startDate, LocalDate endDate) {

		long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, endDate);
		return IntStream.iterate(0, i -> i + 1).limit(numOfDaysBetween).mapToObj(i -> startDate.plusDays(i))
				.collect(Collectors.toList());
	}

	public HashMap<String, LocalDate> getDateByMonthNameAndYear(String monthName, Integer yearValue) {
		Month month = Month.valueOf(monthName.toUpperCase());
		LocalDate monthBegin = LocalDate.of(yearValue, month, 1);
		LocalDate monthEnd = monthBegin.plusMonths(1).withDayOfMonth(1).minusDays(1);

		HashMap<String, LocalDate> monthDates = new HashMap<String, LocalDate>();
		monthDates.put("monthBegin", monthBegin);
		monthDates.put("monthEnd", monthEnd);

		return monthDates;
	}

	public Date getDate(String pattern, String dateValue) {

		TimeZone timeZone = TimeZone.getTimeZone("UTC");
		Date dateVal = null;
		DateFormat formatter = new SimpleDateFormat(pattern);
		formatter.setTimeZone(timeZone);
		try {
			dateVal = formatter.parse(dateValue);
		} catch (ParseException e) {
		}
		return dateVal;
	}

	public Long hoursBetweenDates(Date from, Date to) {
		return TimeUnit.HOURS.convert((to.getTime() - from.getTime()), TimeUnit.MILLISECONDS);
	}

	public String getDateMinusHours(Integer hours) {
		TimeZone timeZone = TimeZone.getTimeZone("UTC");
		Calendar calendar = Calendar.getInstance(timeZone);
		calendar.add(Calendar.HOUR_OF_DAY, -hours);
		Date date = calendar.getTime();
		SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");
		dateFormatter.setTimeZone(timeZone);
		String formattedDate = dateFormatter.format(date).toString() + ".000Z";
		return formattedDate;
	}

}
