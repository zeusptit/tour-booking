package com.tourbooking.service;

import com.tourbooking.dto.Schedules.SchedulesDetailsDto;
import com.tourbooking.model.Schedules;

import java.util.List;

public interface SchedulesService {
    SchedulesDetailsDto addScheduels(Long dayId, SchedulesDetailsDto schedulesDetailsDto);
    SchedulesDetailsDto editSchedules(Long dayId, SchedulesDetailsDto schedulesDetailsDto);
    List<SchedulesDetailsDto> convertToListDto(List<Schedules> schedulesList);

    void deleteSchedule(Long scheduleId);
}
