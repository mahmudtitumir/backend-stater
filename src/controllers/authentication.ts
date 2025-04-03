import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers/index';

export const login = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({
                error: 'Missing required fields',
            });
            return;
        }
        // Check if user is already logged in
        if (req.cookies.authentication) {
            res.status(400).json({
                error: 'Already logged in',
            });
            return;
        }

        const user = await getUserByEmail(email).select(
            '+authentication.salt +authentication.password'
        );
        const hash = authentication(user.authentication.salt, password);
        // Check if user exists
        if (!user) {
            res.status(400).json({
                error: 'User not found',
            });
            return;
        }
        // Check if password is correct
        if (user.authentication.password !== hash) {
            res.status(403).json({
                error: 'Incorrect password',
            });
            return;
        }

        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );
        await user.save();
        res.cookie('AUTHENTICATION', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.status(400)
            .json({
                error: 'Error logging in',
            })
            .end();
    }
};

export const register = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                error: 'Missing required fields',
            });
            return;
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({
                error: 'User already exists',
            });
            return;
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Error creating user',
        });
    }
};
