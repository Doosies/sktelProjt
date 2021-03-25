package com.ppap.sktel.phoneInfo.Service;

import java.util.ArrayList;
import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;

public interface IPhoneInfoService{
    void infoAdd(PhoneInfo phoneInfo);
    List<PhoneInfo> getAllInfo();
    void infoChange(int id, PhoneInfo phoneInfo);
    void infoDelete(List<Integer> id);
}