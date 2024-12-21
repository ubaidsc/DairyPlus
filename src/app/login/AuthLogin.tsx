"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const role = (event.target as any).role.value;
    const username = (event.target as any).username.value;
    const password = (event.target as any).password.value;

    if (!role || !username || !password) {
      setError("All fields are required");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      role,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.replace("/");
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box sx={{ mb: 2 }}>
            <CustomFormLabel htmlFor="role">Login As</CustomFormLabel>
            <CustomTextField
              id="role"
              name="role"
              select
              variant="outlined"
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </CustomTextField>
          </Box>
          <Box>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <CustomTextField
              id="username"
              name="username"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Stack>
        {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
