import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/auth";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({username: '', password: ''})

    const submit = async () => {
        const { username, password } = form;

        if (!username || !password) {
            return Alert.alert('Error', 'Please enter valid username address and password!')
        }

        setIsSubmitting(true)

        try {
            await signIn({ username: username.trim(), password: password });

            router.replace('/')
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your username"
                value={form.username}
                onChangeText={(text) =>
                    setForm((prev) =>
                        ({...prev, username: text}))}
                label="Username"
            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) =>
                    setForm((prev) =>
                        ({...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
            />

            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Dont have an account?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign Up
                </Link>
            </View>

        </View>
    )
}
export default SignIn
