import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const { userId } = req.params;
        const currentUserById = get(req, 'identity._id') as string;
        // Check if user is already logged in
        if (!userId) {
            res.status(400).json({
                error: 'Missing userId',
            });
            return;
        }
        // Check if user is already logged in
        if (!currentUserById) {
            res.status(403).json({
                error: 'Unauthorized',
            });
            return;
        }
        // Check if user is already logged in
        if (currentUserById !== userId) {
            res.status(403).json({
                error: 'Unauthorized',
            });
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Unauthorized',
        });
    }
};

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const sessionToken = req.cookies['AUTHENTICATION'];
        if (!sessionToken) {
            res.status(403).json({
                error: 'Unauthorized',
            });
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            res.status(403).json({
                error: 'Unauthorized',
            });
        }
        merge(req, { identity: existingUser });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Unauthorized',
        });
    }
};
