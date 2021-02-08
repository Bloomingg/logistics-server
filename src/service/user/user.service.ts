import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { newUser, findUser, findRole, newRole, newAccess, findAccess, newRoleAccess, findRoleAccess } from "src/interface/user";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel, @InjectModel('Role') private readonly roleModel, @InjectModel('Access') private readonly accessModel, @InjectModel('RoleAccess') private readonly RoleAccessModel) { }

  //About User
  async findUsers(json: findUser, page: number, size: number = 10) {
    let cur: number = (page - 1) * size
    return await this.userModel.find(json).skip(cur).limit(size)

  }
  async getUsersCount(json: findUser) {
    return await this.userModel.countDocuments(json)
  }
  async addUser(json: newUser) {
    let model = new this.userModel(json)
    return await model.save()
  }
  async updateStatus(id: Schema.Types.ObjectId, json: findUser) {
    return await this.userModel.findByIdAndUpdate(id, json)
  }
  async deleteUser(_id: Schema.Types.ObjectId) {
    // console.log(typeof _id);
    return await this.userModel.findByIdAndDelete(_id)
  }

  //About Role
  async findRole(json: findRole, page: number, size: number = 10) {
    let cur: number = (page - 1) * size
    return await this.roleModel.find(json).skip(cur).limit(size)
  }
  async getRolesCount(json: findRole) {
    return await this.roleModel.countDocuments(json)
  }
  async addRole(json: newRole) {
    let model = new this.roleModel(json)
    return await model.save()
  }
  async updateRole(id: Schema.Types.ObjectId, json: newRole) {
    return await this.roleModel.findByIdAndUpdate(id, json)
  }
  async deleteRole(_id: Schema.Types.ObjectId) {
    // console.log(typeof _id);
    return await this.roleModel.findByIdAndDelete(_id)
  }

  //About Access
  async findAccess(json: findAccess, filed = {}) {
    return await this.accessModel.find(json, filed)
  }
  async addAccess(json: newAccess) {
    let model = new this.accessModel(json)
    return await model.save()
  }
  async updateAccess(id: Schema.Types.ObjectId, json: newAccess) {
    return await this.accessModel.findByIdAndUpdate(id, json)
  }
  async deleteAccess(_id: Schema.Types.ObjectId) {
    return await this.accessModel.findByIdAndDelete(_id)
  }

  //About RoleAccess
  async findRoleAccess(json: findRoleAccess) {
    return await this.RoleAccessModel.find(json)
  }
  async addRoleAccess(json: newRoleAccess) {
    let model = new this.RoleAccessModel(json)
    return await model.save()
  }
  async updateRoleAccess(id: Schema.Types.ObjectId, json: newRoleAccess) {
    return await this.RoleAccessModel.findByIdAndUpdate(id, json)
  }
}
