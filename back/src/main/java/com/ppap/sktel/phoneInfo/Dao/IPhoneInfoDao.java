package com.ppap.sktel.phoneInfo.Dao;

import com.ppap.sktel.phoneInfo.PhoneInfo;

public interface IPhoneInfoDao {
    void phoneInfoInsert();
    void phoneInfoUpdate();
    void phoneInfoDelete();
    PhoneInfo phoneInfoSelect();
}
