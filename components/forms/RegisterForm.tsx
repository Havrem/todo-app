import { useRegister } from "@/hooks/useRegister";
import { RegisterData, registerSchema } from "@/schemas/auth";
import { Entypo } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function RegisterForm() {
    const { mutate: register } = useRegister();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    })
    const onSubmit = (data: RegisterData) => register(data);

    return (
      <>
        <View style={styles.authForm}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.formInputContainer}>
                {errors.email && <Entypo name="info-with-circle" size={20} color="red" />}
                <TextInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    style={[styles.formInputText, { textAlign: 'left' }]}
                />
              </View>
            )}
            name="email"
          />
          {errors.email && <Text style={[styles.badInput, { textAlign: 'right'}]}>{errors.email.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.formInputContainer}>
                <TextInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    value={value}
                    style={[styles.formInputText, { textAlign: 'left' }]}
                  />
                  {errors.password && <Entypo name="info-with-circle" size={20} color="red" />}
              </View>
            )}
            name="password"
          />
          {errors.password && <Text style={[styles.badInput, { textAlign: 'left'}]}>{errors.password.message}</Text>}
        </View>
        <View style={styles.bottomSection}>
          <Pressable style={styles.confirmBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.confirmBtnText}>Let's go!</Text>
          </Pressable>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  confirmBtnText: {
    fontFamily: 'Glory-Bold',
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.51)',
    textAlign: 'center'
  },
  authForm: {
    backgroundColor: "rgba(250, 255, 245, 0.78)",
    // flex: 4,
    padding: 20,
    gap: 10
  },
  badInput: {
    color: 'red',
    paddingHorizontal: 5,
    fontSize: 12,
    textAlign: 'left'
  },
  formInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 40,
    gap: 10
  },
  formInputText: {
    fontFamily: 'Glory-Bold',
    fontSize: 15,
    color: 'rgba(141, 141, 141, 1)',
    flex: 1
  },
  bottomSection: {
    backgroundColor: "rgba(219, 209, 181, 1)",
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  confirmBtn: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 40
  }
});