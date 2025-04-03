import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const users = await getUsers();
        // Check if users exist
        if (!users) {
            res.status(404).json({
                error: 'No users found',
            });
            return;
        }
        res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Error fetching users',
        });
    }
};

export const deleteUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({
                error: 'Missing userId',
            });
            return;
        }
        const user = await deleteUserById(userId);
        // Check if user exists
        if (!user) {
            res.status(404).json({
                error: 'User not found',
            });
            return;
        }
        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Error deleting user',
        });
    }
};

export const updateUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const { userId } = req.params;
        const { username } = req.body;
        // Check if user is already logged in
        if (!userId || !username) {
            res.status(400).json({
                error: 'Missing userId or username',
            });
            return;
        }
        // Check if user is already logged in
        const user = await getUserById(userId);
        user.username = username;
        await user.save();

        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Error updating user',
        });
    }
};
