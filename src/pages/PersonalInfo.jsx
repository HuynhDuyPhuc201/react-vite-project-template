import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '~/services/user.service';

const PersonalInfo = () => {
    const { id } = useParams();
    const fetchUserDetail = async (req, res) => {
        return await userService.getDetail(id);
    };

    const { data } = useQuery({
        queryKey: ['users', id],
        queryFn: fetchUserDetail,
    });

    console.log('fetchData', data);

    return <>Hello</>;
};

export default PersonalInfo;
