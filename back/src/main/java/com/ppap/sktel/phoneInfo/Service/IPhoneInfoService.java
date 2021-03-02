package com.ppap.sktel.phoneInfo.Service;

import com.ppap.sktel.phoneInfo.PhoneInfo;

public interface IPhoneInfoService{
    void infoAdd(PhoneInfo phoneInfo);
    PhoneInfo getAllInfo(int id);
    void infoChange(int id, PhoneInfo phoneInfo);
    void infoDelete(int id);
}