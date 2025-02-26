import { useMutation } from '@tanstack/react-query';

export const useMutationHook = (fnCallback, onSuccess, onError) => {
    return useMutation({
        mutationFn: fnCallback,
        onSuccess: (data) => {
            if (onSuccess) onSuccess(data); // Gọi callback nếu có
        },
        onError: (error) => {
            if (onError) onError(error); // Gọi callback nếu có
        },
    });
};
