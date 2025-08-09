import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import {CustomButtonProps} from "@/type";
import cn from "clsx";

const CustomButton = ({
                          onPress,
                          title,
                          style,
                          leftIcon,
                          textStyle,
                          isLoading,
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ):
                    <Text className={cn('text-white paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                }
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
