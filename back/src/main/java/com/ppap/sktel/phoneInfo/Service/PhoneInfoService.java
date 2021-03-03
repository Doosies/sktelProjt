package com.ppap.sktel.phoneInfo.Service;

import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Dao.PhoneInfoDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
public class PhoneInfoService implements IPhoneInfoService {

    @Autowired
    private PhoneInfoDao phoneInfoDao;

    public PhoneInfoService(){
        
    }

    @Override
    public void infoAdd(PhoneInfo phoneInfo) {
        // TODO 폰 정보 추가

    }

    @Override
    public List<PhoneInfo> getAllInfo() {
        return phoneInfoDao.phoneInfoSelect();
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