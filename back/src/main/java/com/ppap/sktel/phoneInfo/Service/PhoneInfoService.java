package com.ppap.sktel.phoneInfo.Service;

import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Dao.PhoneInfoDao;

import org.springframework.beans.factory.annotation.Autowired;

public class PhoneInfoService implements IPhoneInfoService {

    @Autowired
    PhoneInfoDao PhoneInfoDao;

    @Override
    public void infoAdd(PhoneInfo phoneInfo) {
        // TODO 폰 정보 추가

    }

    @Override
    public PhoneInfo getAllInfo(int id) {
        // TODO 폰 정보 싹다 긁어옴
        return null;
    }

    @Override
    public void infoChange(int id, PhoneInfo phoneInfo) {
        // TODO 폰 정보 수정

    }

    @Override
    public void infoDelete(int id) {
        // TODO 폰 정보 삭제

    }

}